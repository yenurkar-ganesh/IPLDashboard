import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const fetchTeams = async () => {
      const teamsApiUrl = 'https://apis.ccbp.in/ipl'
      const response = await fetch(teamsApiUrl)
      const data = await response.json()
      const updatedTeams = data.teams.map(team => ({
        id: team.id,
        name: team.name,
        teamImageUrl: team.team_image_url,
      }))
      setTeams(updatedTeams)
      setIsLoading(false)
    }
    fetchTeams()
  }, [])

  return (
    <div className=" home-container">
      <div className="container-row d-flex flex-column">
        <div className="app-header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="app-title">IPL Dashboard</h1>
        </div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <ul className="teams-list-section ">
            {teams.map(team => (
              <li
                key={team.id}
                className="bg-light p-3 shadow rounded-lg text-black team-card"
              >
                <Link to={`/team-matches/${team.id}`} className="team-link">
                  <img
                    src={team.teamImageUrl}
                    alt={`team ${team.name}`}
                    className="team-image"
                  />
                  <p className="line"></p>
                  <p className="team-name">{team.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Home
