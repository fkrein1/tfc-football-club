export interface IMatchScore {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatchInput extends IMatchScore{
  homeTeam: number;
  awayTeam: number;
}

export interface IMatch extends IMatchInput {
  id: number;
  inProgress: boolean
  teamHome: {
    teamName: string
  };
  teamAway: {
    teamName: string
  }
}
