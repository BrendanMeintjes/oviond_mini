import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios'

export const Chart = () => {
  const [likesData, setLikesData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60
      const now = Math.floor(Date.now() / 1000)
      const response = await axios.get(
        `https://graph.facebook.com/101221036282378/insights/page_fans?since=${thirtyDaysAgo}&until=${now}&period=day&access_token=EAAImgPTZCQjoBALhgrCb1ZBglPNpEgRW7Ess6esBaOUqMNkk9Pefv9hFZCL3a0M1quRujPMbyaOWRW32XcMUF7kWvHMKr6w1d1GWnIrZAgLkda0ce0MIsAbF92oPEjglyDFZCiVttMLGuk7XznAAa4nUjCYZBZBop3GJPRAKRT9fEVrPSwWsldLukogF91ZBIJ0ZD`
      )
      console.log(response.data.data[0].values)
      const data = await response.data.data[0].values
      console.log(data)
      setLikesData(data)
    }
    fetchData()
  }, [])

  const chartData = likesData.map(({ value, end_time }) => ({
    x: new Date(end_time),
    y: value,
  }))

  const options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Total Likes Over the Past 30 Days',
    },
    xAxis: {
      type: 'datetime',
    },

    yAxis: {
      title: {
        text: 'Total Likes',
      },
    },
    series: [
      {
        name: 'Total Likes',
        data: chartData,
      },
    ],
  }

  return (
    <>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  )
}
