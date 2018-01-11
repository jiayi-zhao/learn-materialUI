import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';

import CommentSelect from './CommentSelect';
import VideoPlayer from './VideoPlayer';
import MenuBar from './MenuBar';
import CommentList from './CommentList';

import { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CommentIcon from 'material-ui-icons/Comment';
import LiveHelpIcon from 'material-ui-icons/LiveHelp';
import Avatar from 'material-ui/Avatar';
import {red, teal} from 'material-ui/colors';


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
  redListItem: {
  	backgroundColor: red[50],
  },
  whiteListItem: {
  	backgroundColor: theme.palette.background.paper,
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
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			commentType: 'Comment',
			videoPlayer: '',
			commentList: [],
			visableCommentElements: [],
			time: 0,
			idLength: 0,
			cmtSectionPg: -1,
			// time: Math.round(videojs("player").currentTime()),
		};
		this.setCommentType = this.setCommentType.bind(this);
		this.setVideoPlayer = this.setVideoPlayer.bind(this);
		this.updateCommentList = this.updateCommentList.bind(this);
		this.sendComment = this.sendComment.bind(this);
		// this.getVideoCurrentTime = this.getVideoCurrentTime.bind(this);
		this.updateVideoTime = this.updateVideoTime.bind(this);
		this.updateVisableListElements = this.updateVisableListElements.bind(this);
		this.jumpToCmtPage = this.jumpToCmtPage.bind(this);
		this.updateAnswer = this.updateAnswer.bind(this);
		this.setQuestionResolved = this.setQuestionResolved.bind(this);
		this.updateFollowUp = this.updateFollowUp.bind(this);
	}

	setCommentType(cmtType) {
		this.setState({ commentType: cmtType });
	}

	setVideoPlayer(player) {
		this.setState({ videoPlayer: player});
	}

	updateCommentList(cmtType, time, val) {
		// console.log(cmtType, time, val);
		var cmtList = this.state.commentList;
		var id = this.state.idLength;
		var resolved = (cmtType === 'Comment') ? true : false;
		cmtList.push({
			"id": id, 
			"cmtType": cmtType, 
			"time": time, 
			"val": val, 
			"resolved": resolved,
			"answer": '',
			"followup": [],
			"followupLength": 0,
		});
		this.setState({commentList: cmtList});
		this.setState({idLength: id+1});
	}

	sendComment() {
		var cmtType = this.state.commentType;
		var time = Math.round(this.state.videoPlayer.currentTime());
		var val = document.querySelector('#commentTextField').value;
		// console.log(document.querySelector('#commentTextField').value);
		this.updateCommentList(cmtType, time, val);
		this.updateVisableListElements();
		document.querySelector('#commentTextField').value = null;
	}

	updateVideoTime() {
		this.setState({time : this.state.videoPlayer.currentTime()});
	}

	jumpToCmtPage(ev) {
		var i = Number(ev.currentTarget.dataset.id);
		this.setState({cmtSectionPg : i});
	}

	updateVisableListElements() {
		const { classes } = this.props;
		var elements = [];
		for (var i = 0; i < this.state.commentList.length; i++) {
			var cmtTime = this.state.commentList[i].time;
			if(cmtTime >= this.state.time-5 && cmtTime <= this.state.time+5){
				elements.push(this.state.commentList[i]);
			}
		}

		var listItems = [];

		elements.sort(function(a, b){
			return a.time - b.time;
		});

		for (var j = 0; j < elements.length; j++){
			var val = elements[j].val;
			var time = elements[j].time;
			var id = elements[j].id;
			var listTextOptions = {primary: val, secondary: time.toString()+'s'};
			var listClasses = [classes.whiteListItem, classes.redListItem];
			var icons = [<CommentIcon />, <LiveHelpIcon />];
			var thisIcon = (elements[j].cmtType === 'Comment') ? icons[0] : icons[1];
			var thisClass = elements[j].resolved ? listClasses[0] : listClasses[1];
			listItems.push(
        <div key={id}>
					<ListItem className={thisClass} button data-id={id} onClick={(ev) => this.jumpToCmtPage(ev)}>
						<Avatar>
							{thisIcon}
						</Avatar>
						<ListItemText {...listTextOptions} />
					</ListItem>
					<Divider light />
				</div>
			);
		}

		// console.log('called updateVisableListElements', listItems, this.state.time);
		this.setState({visableCommentElements: listItems});
	}

	updateAnswer(id, answer) {
		var cmtList = this.state.commentList;
		cmtList[id].answer = answer;
		this.setState({ commentList : cmtList});
	}

	setQuestionResolved(id, status) {
		var cmtList = this.state.commentList;
		cmtList[id].resolved = status;
		this.setState({ commentList : cmtList});
		this.updateVisableListElements();
	}

	updateFollowUp(id, person, val) {
		var cmtList = this.state.commentList;
		var followupList = cmtList[id].followup;
		var followupID = cmtList[id].followupLength;
		followupList.push({
			"id" : followupID,
			"person" : person,
			"val" : val,
		});
		cmtList[id].followup = followupList;
		cmtList[id].followupLength = followupID+1;
		this.setState({ commentList : cmtList});
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
	      	    	<VideoPlayer 
	      	    		setVideoPlayer={this.setVideoPlayer}
	      	    		updateVideoTime={this.updateVideoTime}
	      	    		updateVisableListElements={this.updateVisableListElements}
	      	    		controls
									preload='auto'
									poster='https://vjs.zencdn.net/v/oceans.png'
									sources={[{'src': 'https://vjs.zencdn.net/v/oceans.mp4', 'type': "video/mp4"},
									{'src': 'https://vjs.zencdn.net/v/oceans.webm', 'type': 'video/webm'}, 
									{'src': 'https://vjs.zencdn.net/v/oceans.ogv', 'type': 'video/ogg'}]}
	      	    	/>
	      	    </Grid>
	      	    <Grid item xs={4}>
	      	    	<VideoPlayer { ...videoPlayerOptions } />
	      	    </Grid>
	      	    <Grid item xs={5}>
	      	    	<form className={classes.inputContainer} noValidate autoComplete="off">
		      	    	<TextField className={classes.textField} id="commentTextField"
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
	      	    			<Button onClick={(ev) => this.sendComment()} className={classes.button} raised color="primary">
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
      				<CommentList 
      					page = {this.state.cmtSectionPg}
      					commentList = {this.state.commentList}
      					visableCommentElements = {this.state.visableCommentElements}
      					jumpToCmtPage = {this.jumpToCmtPage}
      					updateAnswer = {this.updateAnswer}
      					setQuestionResolved = {this.setQuestionResolved}
      					updateFollowUp = {this.updateFollowUp}
      				/>
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