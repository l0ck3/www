class PlayerVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      youtubePlayer: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.youtubePlayer && nextProps.jump) {
      if (nextProps.selectedProduct === null) {
        this.state.youtubePlayer.seekTo(0);
      } else {
        this.state.youtubePlayer.seekTo(nextProps.selectedProduct.demoday_timestamp);
      }
      this.state.youtubePlayer.playVideo();
    }
  }

  componentDidMount() {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      var player = new YT.Player('youtube-player', {
        height: '413',
        width: '640',
        videoId: this.props.youtubeVideoId,
        events: {
          'onReady': this.onReady,
          // 'onReady': ((event) => event.target.playVideo()),
          // 'onTimeUpdate': ((arg) => console.log(arg))
        }
      });
      this.setState({ youtubePlayer: player });
    }

    setInterval(this.reportCurrentTime, 1000);
  }

  onReady = () => {
    if (this.props.selectedProduct) {
      this.state.youtubePlayer.seekTo(this.props.selectedProduct.demoday_timestamp);
    }
  }

  reportCurrentTime = () => {
    if (this.state.youtubePlayer && this.state.youtubePlayer.getCurrentTime && this.state.youtubePlayer.getPlayerState() === YT.PlayerState.PLAYING) {
      this.props.reportCurrentTime(this.state.youtubePlayer.getCurrentTime());
    }
  }

  render() {

    return (
      <div className="player-video" id="youtube-player">

      </div>
    )
  }
}
