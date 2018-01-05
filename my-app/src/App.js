import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import Paper from 'material-ui/Paper';

import CommentSelect from './CommentSelect';
import VideoPlayer from './VideoPlayer';
import MenuBar from './MenuBar';
import CommentList from './CommentList';


const styles = theme => ({
  root: {
    width: '100%',
  },
  video: {
  	width: '100%',
  },
  containers: {
  	paddingTop: '2%',
  },
  paper: {
  	marginTop: '4%',
  	height: '80vh',
  	width: '100%',
  },
  textField: {
  	margin: theme.spacing.unit,
  },
  inputContainer: {
  	display: 'flex',
  	flexWrap: 'wrap',
  },
  button: {
  	margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const videoPlayerOptions = {
	controls: true,
	preload: 'auto',
	poster: 'https://vjs.zencdn.net/v/oceans.png',
	sources: [{
    src: 'https://vjs.zencdn.net/v/oceans.mp4',
    type: 'video/mp4'
  }, {
    src: 'https://vjs.zencdn.net/v/oceans.webm',
    type: 'video/webm'
  }, {
    src: 'https://vjs.zencdn.net/v/oceans.ogv',
    type: 'video/ogg'
  }],
  className: '{classes.video}',
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			commentType: 'Comment',
			// time: Math.round(videojs("player").currentTime()),
		};
		this.setCommentType = this.setCommentType.bind(this);
	}

	setCommentType(cmtType) {
		this.setState({ commentType: cmtType });
	}

	render() {
		const { classes } = this.props;
	  return (
	    <div className={classes.root}>
	      <MenuBar />
	      <Grid container xs={12} spacing={40}>
	        <Grid item xs={8}>
	      	  <Grid container spacing={24} className={classes.containers}>
	      	    <Grid item xs={12}>
								<VideoPlayer { ...videoPlayerOptions } />
	      	    </Grid>
	      	    <Grid item xs={4}>
	      	    	<VideoPlayer { ...videoPlayerOptions } />
	      	    </Grid>
	      	    <Grid item xs={5}>
	      	    	<form className={classes.inputContainer} noValidate autoComplete="off">
		      	    	<TextField className={classes.textField}
		      	    	  fullWidth
					          label="Comment / Question"
					        />
				        </form>
	      	    </Grid>
	      	    <Grid item xs={3}>
	      	    	<Grid container spacing={40}>
	      	    		<Grid item xs={12}>
	      	    			<CommentSelect setCommentType={this.setCommentType}/>
	      	    		</Grid>
	      	    		<Grid item xs={12}>
	      	    			<Button className={classes.button} raised color="primary">
						          Send
						          <Send className={classes.rightIcon} />
						        </Button>
	      	    		</Grid>
	      	    	</Grid>
	      	    </Grid>
	      	  </Grid>
	      	</Grid>
	      	<Grid item xs={4}>
      			<Grid container className={classes.containers}>
      				<CommentList />
      			</Grid>
	      	</Grid>
	      </Grid>
	    </div>
	  );
	}
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);