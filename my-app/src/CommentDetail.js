import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';

const styles = theme => ({
  main: {
  	margin: theme.spacing.unit,
  	marginLeft: 2*theme.spacing.unit,
  	maxHeight: '80vh',
  	overflow: 'scroll',
  },
  paper: {
  	padding: theme.spacing.unit,
  	borderRadius: 4,
  	border: '1px solid #ced4da',
  	marginBottom: 3*theme.spacing.unit,
  },
  icon: {
  	marginRight: theme.spacing.unit,
  },
  title: {
  	marginBottom: 3*theme.spacing.unit,
  },
  answerTitle: {
  	marginBottom: theme.spacing.unit,
  },
  backButton: {
  	paddingLeft: 0,
  	marginBottom: theme.spacing.unit,
  },
  container: {
  	width: '100%',
    display: 'inline-block',
    flexWrap: 'wrap',
  },
  textFieldRoot: {
    padding: 0,
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
  },
  answerButton: {
  	marginTop: theme.spacing.unit,
  	float: 'right',
  },
  commentList: {
    width: '100%',
    background: theme.palette.background.paper,
    // margin: theme.spacing.unit,
  },
  commentListItem: {
  	paddingLeft: 0,
  },
  resolvedRadios: {
  	display: 'flex',
  },
  radioButtons: {
  	marginLeft: theme.spacing.unit,
  	marginRight: theme.spacing.unit,
  	padding: 0,
  	width: 'auto',
  	height: 'auto',
  },
});

class CommentDetail extends Component {
	constructor(props) {
		super(props);

		var cmtList = this.props.commentList;
		var page = this.props.page;
		var resolved = (cmtList[page].resolved) ? 'resolved' : 'unresolved';
		
		this.state = {
			resolved: resolved,
		};

		this.displayContent = this.displayContent.bind(this);
		this.displayQstionWithAnswerForm = this.displayQstionWithAnswerForm.bind(this);
		this.displayQstionWithAnswerNoFUp = this.displayQstionWithAnswerNoFUp.bind(this);
		this.displayQstionWithAnswerFUp = this.displayQstionWithAnswerFUp.bind(this);
		this.displayCmtNoFUp = this.displayCmtNoFUp.bind(this);
		this.displayCmtFUp = this.displayCmtFUp.bind(this);
		this.displayFollowUpList = this.displayFollowUpList.bind(this);
		this.sendAnswer = this.sendAnswer.bind(this);
		this.sendFollowUp = this.sendFollowUp.bind(this);
		this.displayResolvedRadios = this.displayResolvedRadios.bind(this);
		this.handleResolvedChange = this.handleResolvedChange.bind(this);
	}

	sendAnswer() {
		var val = document.querySelector('#answerTextField').value;
		this.props.updateAnswer(this.props.page, val);
		this.props.setQuestionResolved(this.props.page, true);
		document.querySelector('#answerTextField').value = null;
	}

	sendFollowUp(firstFollowUp) {
		var val = document.querySelector('#followupTextField').value;
		var person = "ST";
		this.props.updateFollowUp(this.props.page, person, val);
		if (firstFollowUp){
			this.props.setQuestionResolved(this.props.page, false);
			this.setState({ resolved : 'unresolved'});
		}
		document.querySelector('#followupTextField').value = '';
	}

	displayQstionWithAnswerForm() {
		const { classes } = this.props;
		return (
			<div className={classes.container}>
	      <TextField
	      	id="answerTextField"
	        fullWidth
	        multiline
	        rows={2}
	        placeholder="Answer"
	        InputProps={{
	          disableUnderline: true,
	          classes: {
	            root: classes.textFieldRoot,
	            input: classes.textFieldInput,
	          },
	        }}
	      />
	      <Button raised color="primary" className={classes.answerButton} onClick={(ev) => this.sendAnswer()}>
	        Submit
	      </Button>
  		</div>
		);
	}

	displayQstionWithAnswerNoFUp() {
		const { classes } = this.props;
		var cmtList = this.props.commentList;
		var page = this.props.page;
		return (
			<div>
				<div className={classes.paper}>
					<Typography type="subheading" className={classes.answerTitle}>
						Answer:
					</Typography>
					<Typography type="body2" className={classes.title}>
						{cmtList[page].answer}
					</Typography>
					<Typography type="caption" align="right">
						Updated on Jan 10, 2017
					</Typography>
				</div>
				{this.displayCmtNoFUp()}
			</div>
		);
	}

	displayQstionWithAnswerFUp() {
		const { classes } = this.props;
		var cmtList = this.props.commentList;
		var page = this.props.page;
		return (
			<div>
				<div className={classes.paper}>
					<Typography type="subheading" className={classes.answerTitle}>
						Answer:
					</Typography>
					<Typography type="body2" className={classes.title}>
						{cmtList[page].answer}
					</Typography>
					<Typography type="caption" align="right">
						Updated on Jan 10, 2017
					</Typography>
				</div>
				{this.displayCmtFUp()}
			</div>
		);
	}

	displayCmtNoFUp() {
		const { classes } = this.props;
		return (
			<div className={classes.paper}>
				<Typography type="subheading" className={classes.answerTitle}>
					Follow Up:
				</Typography>
				<div className={classes.container}>
		      <TextField
		      	id="followupTextField"
		        fullWidth
		        multiline
		        rows={1}
		        placeholder="Follow Up"
		        InputProps={{
		          disableUnderline: true,
		          classes: {
		            root: classes.textFieldRoot,
		            input: classes.textFieldInput,
		          },
		        }}
		      />
		      <Button raised color="primary" className={classes.answerButton} onClick={(ev) => this.sendFollowUp(true)}>
		        Submit
		      </Button>
	  		</div>
			</div>
		);
	}

	displayFollowUpList() {
		const { classes } = this.props;
		var cmtList = this.props.commentList;
		var page = this.props.page;
		var followupList = cmtList[page].followup;
		var elements = [];
		for (var i = 0; i < followupList.length; i++){
			var id = followupList[i].id;
			var person = followupList[i].person;
			var val = followupList[i].val;
			elements.push(
				<ListItem className={classes.commentListItem}>
					<Avatar>
						{person}
					</Avatar>
					<ListItemText 
	        	disableTypography
        		primary={
        			<Typography type="body1">
        				{val}
        			</Typography>} 
        	/>
				</ListItem>
			);
		}
		return (
			<List className={classes.commentList}>
	      {elements}
	    </List>
		);
	}

	handleResolvedChange(value) {
		console.log("Called handleResolvedChange with value: ", value);
    this.setState({ resolved : value });
    if (value === 'resolved') {
    	this.props.setQuestionResolved(this.props.page, true);
    } else {
    	this.props.setQuestionResolved(this.props.page, false);
    }
  };

  displayResolvedRadios() {
  	const { classes } = this.props;
  	return (
  		<div className={classes.resolvedRadios}>
        <Radio className={classes.radioButtons}
          checked={this.state.resolved === 'resolved'}
          onChange={(ev) => this.handleResolvedChange('resolved')}
          value="resolved"
          aria-label="Resolved"
        />
        <Typography type="body2">
					Resolved
				</Typography>
        <Radio className={classes.radioButtons}
          checked={this.state.resolved === 'unresolved'}
          onChange={(ev) => this.handleResolvedChange('unresolved')}
          value="unresolved"
          aria-label="Unresolved"
        />
        <Typography type="body2">
					Unresolved
				</Typography>
      </div>
  	);
  }

	displayCmtFUp() {
		const { classes } = this.props;
		return (
			<div className={classes.paper}>
				<div className={classes.resolvedRadios}>
					<Typography type="subheading">
						Follow Up:
					</Typography>
					{this.displayResolvedRadios()}
				</div>
				{this.displayFollowUpList()}
				<div className={classes.container}>
		      <TextField
		      	id="followupTextField"
		        fullWidth
		        multiline
		        rows={1}
		        placeholder="Follow Up"
		        InputProps={{
		          disableUnderline: true,
		          classes: {
		            root: classes.textFieldRoot,
		            input: classes.textFieldInput,
		          },
		        }}
		      />
		      <Button raised color="primary" className={classes.answerButton} onClick={(ev) => this.sendFollowUp(false)}>
		        Submit
		      </Button>
	  		</div>
			</div>
		);
	}

	displayContent() {
		var cmtList = this.props.commentList;
		var page = this.props.page;
		if (cmtList[page].cmtType === 'Comment') {
			if (cmtList[page].followup.length === 0) {
				return this.displayCmtNoFUp();
			} else {
				return this.displayCmtFUp();
			}
		} else {
			if (cmtList[page].followup.length === 0) {
				if (cmtList[page].resolved){
					return this.displayQstionWithAnswerNoFUp();
				} else {
					return this.displayQstionWithAnswerForm();
				}
			} else {
				return this.displayQstionWithAnswerFUp();
			}
		}
	}

	render() {
		var cmtList = this.props.commentList;
		var page = this.props.page;
		const { classes } = this.props;

		return (
			<div className={classes.main}>
				<Button className={classes.backButton} data-id={-1} onClick={(ev) => this.props.jumpToCmtPage(ev)}>
					<ArrowBackIcon className={classes.icon}/>
					Back
				</Button>
				<div className={classes.paper}>
					<Typography type="subheading" className={classes.title}>
						{cmtList[page].val}
					</Typography>
					<Typography type="caption" align="right">
						Asked on Jan 10, 2017
					</Typography>
				</div>
				{this.displayContent()}
			</div>
		);
	}
}

CommentDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentDetail);