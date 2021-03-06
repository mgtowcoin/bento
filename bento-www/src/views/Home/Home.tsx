import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Countdown from 'react-countdown';


import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'

import useBento from '../../hooks/useBento'

import Rebase from './components/Rebase'
import Stats from './components/Stats'

import { OverviewData } from './types'
import { getStats } from './utils'

const Home: React.FC = () => {

  const bento = useBento()
  const [{
    circSupply,
    curPrice,
    nextRebase,
    targetPrice,
    totalSupply,
  }, setStats] = useState<OverviewData>({})

  const fetchStats = useCallback(async () => {
    const statsData = await getStats(bento)
    setStats(statsData)
  }, [bento, setStats])

  useEffect(() => {
    if (bento) {
      fetchStats()
    }
  }, [bento])

  const countdownBlock = () => {
    const date = Date.parse("2020-09-08T16:00:00+0000");
    if (Date.now() >= date) return "";
    return (
      <CountdownView>
        <Countdown date={date} />
      </CountdownView>
    )
  }

  return (
    <Page>
      {countdownBlock()}

      <PageHeader icon="🍱" subtitle="It's a great day to box BENTOs." title="Welcome" />

      <StyledOverview>
        <Rebase nextRebase={nextRebase} />
        <StyledSpacer />
        <Stats
          circSupply={circSupply}
          curPrice={curPrice}
          targetPrice={targetPrice}
          totalSupply={totalSupply}
        />
      </StyledOverview>
    </Page>
  )
}

const StyledOverview = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
  }
`

const CountdownView =  styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #555;
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
`

export default Home
