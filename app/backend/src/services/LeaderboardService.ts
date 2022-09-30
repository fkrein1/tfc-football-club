import { ILeaderboard } from '../interfaces/ILeaderboard';
import { IMatch } from '../interfaces/IMatch';
import MatchModel from '../models/MatchModel';

// import CustomError from '../middlewares/CustomError';

export default class LeaderboardService {
  constructor(
    private model: MatchModel = new MatchModel(),
  ) {}

  async getAway() {
    const games = await this.model.findAll();
    const awayGames = LeaderboardService.generetaAwayGames(games);
    const accumulatedGames = LeaderboardService.accumulateGames(awayGames);
    const mapAndFiterGames = LeaderboardService.mapAndFilterGames(accumulatedGames);
    return mapAndFiterGames;
  }

  async getHome() {
    const games = await this.model.findAll();
    const homeGames = LeaderboardService.generateHomeGames(games);
    const accumulatedGames = LeaderboardService.accumulateGames(homeGames);
    const mapAndFiterGames = LeaderboardService.mapAndFilterGames(accumulatedGames);
    return mapAndFiterGames;
  }

  async getAll() {
    const games = await this.model.findAll();
    const awayGames = LeaderboardService.generetaAwayGames(games);
    const homeGames = LeaderboardService.generateHomeGames(games);
    const accumulatedGames = LeaderboardService.accumulateGames([...awayGames, ...homeGames]);
    const mapAndFiterGames = LeaderboardService.mapAndFilterGames(accumulatedGames);
    return mapAndFiterGames;
  }

  private static mapAndFilterGames(games: ILeaderboard[]) {
    return games.map((game) => ({
      ...game,
      goalsBalance: game.goalsFavor - game.goalsOwn,
      efficiency: ((game.totalPoints / (game.totalGames * 3)) * 100).toFixed(2),
    })).sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn
    ));
  }

  private static accumulateGames(games: ILeaderboard[]) {
    const leaderBoard = [] as ILeaderboard[];
    games.forEach((game) => {
      const index = leaderBoard.findIndex((accGame) => accGame.name === game.name);
      if (index === -1) leaderBoard.push({ ...game, totalGames: 1 });
      else {
        leaderBoard[index].totalPoints += game.totalPoints;
        leaderBoard[index].totalVictories += game.totalVictories;
        leaderBoard[index].totalDraws += game.totalDraws;
        leaderBoard[index].totalLosses += game.totalLosses;
        leaderBoard[index].goalsFavor += game.goalsFavor;
        leaderBoard[index].goalsOwn += game.goalsOwn;
        leaderBoard[index].totalGames += 1;
      }
    });
    return leaderBoard;
  }

  private static generetaAwayGames(games: IMatch[]) {
    return games.filter((game) => !game.inProgress).map((game) => {
      let score = { point: 0, tye: 0, loss: 0, win: 0 };
      if (game.awayTeamGoals === game.homeTeamGoals) {
        score = { ...score, point: 1, tye: 1 };
      } else if (game.awayTeamGoals > game.homeTeamGoals) {
        score = { ...score, point: 3, win: 1 };
      } else { score = { ...score, loss: 1 }; }
      return {
        name: game.teamAway.teamName,
        totalPoints: score.point,
        totalVictories: score.win,
        totalDraws: score.tye,
        totalLosses: score.loss,
        goalsFavor: game.awayTeamGoals,
        goalsOwn: game.homeTeamGoals,
      } as ILeaderboard;
    });
  }

  static generateHomeGames(games: IMatch[]) {
    return games.filter((game) => !game.inProgress).map((game) => {
      let score = { point: 0, tye: 0, loss: 0, win: 0 };
      if (game.homeTeamGoals === game.awayTeamGoals) {
        score = { ...score, point: 1, tye: 1 };
      } else if (game.homeTeamGoals > game.awayTeamGoals) {
        score = { ...score, point: 3, win: 1 };
      } else { score = { ...score, loss: 1 }; }
      return {
        name: game.teamHome.teamName,
        totalPoints: score.point,
        totalVictories: score.win,
        totalDraws: score.tye,
        totalLosses: score.loss,
        goalsFavor: game.homeTeamGoals,
        goalsOwn: game.awayTeamGoals,
      } as ILeaderboard;
    });
  }
}
