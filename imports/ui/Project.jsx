import React from 'react'
import { useParams } from 'react-router-dom'
import { useTracker } from 'meteor/react-meteor-data'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { ClientsCollection } from '../db/ClientsCollection'
import { ProjectsCollection } from '../db/ProjectsCollection'

export const Chart = () => {
  const { id, projectId } = useParams()

  const project = useTracker(() => ProjectsCollection.findOne({ _id: projectId }))
  const client = useTracker(() => ClientsCollection.findOne({ _id: id }))

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
      minTickInterval: 1,

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
      <div className='flex items-center py-2 border-b-2 border-b-blue-600 border-b-opacity-75'>
        <i className='fa-solid fa-briefcase text-5xl mr-2 text-blue-600 opacity-75'></i>
        <div>
          <h4 className='text-2xl font-bold'>Project: {project?.projectName}</h4>
          <p className='text-gray-500'>Client: {client?.clientCompanyName}</p>
        </div>
      </div>
      <h3 className='text-2xl text-center font-semibold pt-5'>FACEBOOK</h3>
      <div className='px-10'>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  )
}
