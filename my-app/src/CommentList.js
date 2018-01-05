import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CommentIcon from 'material-ui-icons/Comment';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
  commentList: {
    width: '100%',
    background: theme.palette.background.paper,
    margin: theme.spacing.unit,
  },
  commentIcon: {
  	marginRight: theme.spacing.unit,
  }
});

class CommentList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { classes } = this.props;

		return (
			<List className={classes.commentList}>
	      <ListItem button>
	        <CommentIcon className={classes.commentIcon} />
	        <ListItemText primary="Comments / Questions" />
	      </ListItem>
	      <Divider light />
	    </List>
		);
	}
}

CommentList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentList);