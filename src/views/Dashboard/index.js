import React, { Component, createRef } from 'react'
import { Card, Row, Col, Spin } from 'antd'

import { getArticleAmount } from '../../requests'

import echarts from 'echarts'

import './dashboard.less'
export default class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      // 图表的加载状态
      isLoading: false
    }
    // 创建echarts要在哪个div渲染
    this.articleAmount = createRef()
  }
  initArticleChart = () => {
    // 图表的加载状态
    this.setState({
      isLoading: true
    })
    // echarts初始化
    this.articleChart = echarts.init(this.articleAmount.current)
    // 获取数据
    getArticleAmount()
      .then((resp) => {
        console.log(resp)
        const option = {
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: resp.amount.map(item => item.month)
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: resp.amount.map(item => item.value),
              type: 'line',
              areaStyle: {}
          }]
        }
        // 参数传入
        this.articleChart.setOption(option)
      })
      .finally(() => {
        // 图表的加载状态
        this.setState({
          isLoading: false
        })
      })
  }
  componentDidMount() {
    this.initArticleChart()
  }
  render() {
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Card 
          title="概览" 
          bordered={false}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box" style={{backgroundColor: '#29B6f6'}}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box" style={{backgroundColor: '#AB47BC'}}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box" style={{backgroundColor: '#FF7043'}}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box" style={{backgroundColor: '#43A047'}}>col-6</div>
            </Col>
          </Row>
        </Card>
        <Card 
          title="最近浏览量" 
          bordered={false}
        >
          <Spin spinning={this.state.isLoading}>
            <div ref={this.articleAmount} style={{height: '390px'}}/>
          </Spin>
        </Card>
      </div>
    )
  }
}
