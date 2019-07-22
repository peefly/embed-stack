import { connect } from 'react-redux'
import { InputPanel } from 'components/InputPanel'
import { AddEmbed, SetEmbedInputRaw } from 'actions/app'

const mapStateToProps = (state) => {
  return {
    embedListData: state.embedListData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addHandler: (newEmbed) => {
      dispatch(AddEmbed(newEmbed));
    },
    setEmbedInputRawHandler: (embedInputRaw) => {
      dispatch(SetEmbedInputRaw(embedInputRaw));
    }
  }
}

export const InputContainer = connect(
  mapStateToProps, mapDispatchToProps
)(InputPanel)
