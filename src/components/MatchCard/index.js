import './index.css'

const MatchCard = props => {
  const {matchData} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchData
  const matchStatusClassName =
    matchStatus === 'Won' ? 'match-won' : 'match-lost'

  return (
    <li className="match-card bg-light rounded p-3 ">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="competing-team-logo"
      />
      <p className="competing-team">{competingTeam}</p>
      <p className="match-result">{result}</p>
      <p className={matchStatusClassName}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
