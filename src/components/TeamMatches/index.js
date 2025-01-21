import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'

import MatchCard from '../MatchCard'

import './index.css'

const TeamMatches = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [teamData, setTeamData] = useState(null)

  const {match} = props
  const {params} = match
  const {id} = params

  useEffect(() => {
    const fetchTeamData = async () => {
      const teamMatchesApiUrl = `https://apis.ccbp.in/ipl/${id}`
      const response = await fetch(teamMatchesApiUrl)
      const data = await response.json()
      const updatedData = {
        teamBannerUrl: data.team_banner_url,
        latestMatchDetails: {
          competingTeam: data.latest_match_details.competing_team,
          date: data.latest_match_details.date,
          venue: data.latest_match_details.venue,
          result: data.latest_match_details.result,
          firstInnings: data.latest_match_details.first_innings,
          secondInnings: data.latest_match_details.second_innings,
          manOfTheMatch: data.latest_match_details.man_of_the_match,
          umpires: data.latest_match_details.umpires,
        },
        recentMatches: data.recent_matches.map(match => ({
          id: match.id,
          competingTeam: match.competing_team,
          competingTeamLogo: match.competing_team_logo,
          result: match.result,
          matchStatus: match.match_status,
        })),
      }
      setTeamData(updatedData)
      setIsLoading(false)
    }
    fetchTeamData()
  }, [id])

  console.log(teamData)
  return (
    <div className="team-matches-container">
      {isLoading ? (
        <div data-testid="loader">
          <Loader type="Oval" color="#ffffff" height={50} width={50} />
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <img
              src={teamData.teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            <h1 className="latest-matches-heading">Latest Matches</h1>
            <div className="latest-match-section bg-light rounded p-3 shadow latest-match text-black">
              <div className="">
                <p className="compite-team">
                  {teamData.latestMatchDetails.competingTeam}
                </p>
                <p className="compite-date">
                  {teamData.latestMatchDetails.date}
                </p>
                <h5>Venue : </h5>
                <p>{teamData.latestMatchDetails.venue}</p>
                <h5>Result : </h5>
                <p>{teamData.latestMatchDetails.result}</p>
              </div>
              <div className="">
                <h5>First Inning : </h5>
                <p>{teamData.latestMatchDetails.firstInnings}</p>
                <h5>Second Inning : </h5>
                <p>{teamData.latestMatchDetails.secondInnings}</p>
                <h5>Man of the match : </h5>
                <p>{teamData.latestMatchDetails.manOfTheMatch}</p>
                <h5>Umpires: </h5>
                <p>{teamData.latestMatchDetails.umpires}</p>
              </div>
            </div>
            <ul className="recent-matches-list">
              {teamData.recentMatches.map(match => (
                <MatchCard key={match.id} matchData={match} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamMatches
