import React from 'react';
import videojs from 'video.js';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

require('video.js/dist/video-js.css');

const styles = {
  video: {
    width: '100%',
  },
};

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.videoUpdate = this.videoUpdate.bind(this);
  }

  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
    if (this.props.setVideoPlayer){
      this.props.setVideoPlayer(this.player);
    }
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  videoUpdate() {
    // console.log("video update in onTimeUpdate", this.props);
    this.props.updateVideoTime();
    // console.log("------------------------");
    // console.log("called updateVisableListElements in videoUpdate");
    this.props.updateVisableListElements();
    // console.log("------------------------");
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    // const { classes } = this.props;
    // console.log(this.props);
    return (
      <div data-vjs-player>
        <video ref={ node => this.videoNode = node } onTimeUpdate={this.videoUpdate} className="video-js vjs-fluid"></video>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoPlayer);