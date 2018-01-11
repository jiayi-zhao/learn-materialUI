import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CommentIcon from 'material-ui-icons/Comment';

import CommentDetail from './CommentDetail';

const styles = theme => ({
  commentList: {
    width: '100%',
    background: theme.palette.background.paper,
    margin: theme.spacing.unit,
  },
  commentIcon: {
  	marginRight: theme.spacing.unit,
  },
});

class CommentList extends Component {
	constructor(props) {
		super(props);

		this.displayContent = this.displayContent.bind(this);
	}

	displayContent() {
		if (this.props.page === -1) {
			return (this.props.visableCommentElements);
		} else {
			return (
				<CommentDetail 
					commentList = {this.props.commentList}
					page = {this.props.page}
					jumpToCmtPage = {this.props.jumpToCmtPage}
					updateAnswer = {this.props.updateAnswer}
					setQuestionResolved = {this.props.setQuestionResolved}
					updateFollowUp = {this.props.updateFollowUp}
				/>
			);
		}
	}

	render() {
		const { classes } = this.props;

		return (
			<List className={classes.commentList}>
	      <ListItem>
	        <CommentIcon className={classes.commentIcon} />
	        <ListItemText primary="Comments / Questions" />
	      </ListItem>
	      <Divider/>
	      {this.displayContent()}
	    </List>
		);
	}
}

CommentList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentList);