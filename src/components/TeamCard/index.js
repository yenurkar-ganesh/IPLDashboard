import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = ({eachTeam}) => {
  const {id, name, teamImageUrl} = eachTeam
  return (
    <li className="team-card">
      <Link to={`/team-matches/${id}`} className="team-card-link">
        <img className="team-logo" src={teamImageUrl} alt={`team ${name}`} />
        <p className="team-name">{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard
