import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTracker } from 'meteor/react-meteor-data'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios'
import { ProjectsCollection } from '../db/ProjectsCollection'

export const Chart = () => {
  const { id, projectId } = useParams()

  const project = useTracker(() => ProjectsCollection.findOne({ _id: projectId }))
  console.log(project)

  const likesData = project?.fbLikes

  const chartData = likesData?.map(({ value, end_time }) => ({
    x: new Date(end_time.substring(0, 10)),
    y: value,
  }))

  const options = {
    chart: {
      type: 'line',
    },
    title: {
      display: true,
      text: 'Total Page Likes',
      color: 'red',
      fontColor: '#333',
      fontSize: 24,
      fontStyle: 'bold',
      align: 'start',
    },

    subtitle: {
      display: true,
      text: 'Last 30 days',
      fontColor: '#333',
      fontSize: 14,
      fontStyle: 'normal',
      align: 'start',
    },
    xAxis: {
      type: 'datetime',
    },

    yAxis: {
      title: {
        text: null,
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
      <h3 className='text-3xl text-center'>FACEBOOK</h3>
      <div className='px-10'>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  )
}
