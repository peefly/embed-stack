import { connect } from 'react-redux'
import { EmbedPanel } from 'components/EmbedPanel.js'
import { RemoveEmbed } from 'actions/app'

const mapStateToProps = (state) => {
  return {
    embedList: state.embedList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeHandler: (uid) => {
      dispatch(RemoveEmbed(uid));
    }
  }
}

export const EmbedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbedPanel)
