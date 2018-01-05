import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class CommentSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commentType: 'Comment',
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value }, function(){
      this.props.setCommentType(event.target.value);
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} autoComplete="off">
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.commentType}
            onChange={this.handleChange}
            name="commentType"
            className={classes.selectEmpty}
          >
            <MenuItem value={'Comment'}>Comment</MenuItem>
            <MenuItem value={'Question'}>Question</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

CommentSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentSelect);