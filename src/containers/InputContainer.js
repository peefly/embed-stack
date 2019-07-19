import { connect } from 'react-redux'
import { InputPanel } from 'components/InputPanel'
import { AddEmbed } from 'actions/app'

const mapDispatchToProps = (dispatch) => {
  return {
    addHandler: (newEmbed) => {
      dispatch(AddEmbed(newEmbed));
    }
  }
}

export const InputContainer = connect(
  null, mapDispatchToProps
)(InputPanel)
