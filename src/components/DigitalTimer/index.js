// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  pauseTimeInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimit = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimit = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, pauseTimeInSeconds} = this.state
    const isButtonDisabled = pauseTimeInSeconds > 0

    return (
      <div className="time-limit-container">
        <p className="para1">Set Timer Limit</p>
        <div className="time-limit-controller">
          <button
            type="button"
            className="button1"
            disabled={isButtonDisabled}
            onClick={this.onDecreaseTimerLimit}
          >
            -
          </button>

          <div className="time-limit-label-container">
            <p className="para2">{timerLimitInMinutes}</p>
          </div>

          <button
            type="button"
            className="button1"
            disabled={isButtonDisabled}
            onClick={this.onIncreaseTimerLimit}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  increasePauseTimeInSeconds = () => {
    const {timerLimitInMinutes, pauseTimeInSeconds} = this.state
    const isTimerCompleted = pauseTimeInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        pauseTimeInSeconds: prevState.pauseTimeInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, pauseTimeInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = pauseTimeInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({pauseTimeInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.increasePauseTimeInSeconds, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  renderTimerController() {
    const {isTimerRunning} = this.state

    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? ' pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          type="button"
          className="button2"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            className="img1"
            src={startOrPauseImageUrl}
            alt={startOrPauseAltText}
          />
          <p className="para3">{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>

        <button type="button" className="button2" onClick={this.onResetTimer}>
          <img
            className="img1"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
          />
          <p className="para3">Reset</p>
        </button>
      </div>
    )
  }

  getPauseSecondsInTimeFormat() {
    const {timerLimitInMinutes, pauseTimeInSeconds} = this.state
    const totalRemainingSeconds = timerLimitInMinutes * 60 - pauseTimeInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="bg-container">
        <h1 className="head1">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="left-container">
            <div className="pause-time-container">
              <h1 className="head2">{this.getPauseSecondsInTimeFormat()}</h1>
              <p className="para4">{labelText}</p>
            </div>
          </div>

          <div className="right-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
