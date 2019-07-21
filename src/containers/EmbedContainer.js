import { connect } from 'react-redux'
import { EmbedPanel } from 'components/EmbedPanel.js'
import { RemoveEmbed, TopEmbed } from 'actions/app'

const mapStateToProps = (state) => {
  return {
    embedListData: state.embedListData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeHandler: (uid) => {
      dispatch(RemoveEmbed(uid));
    },
    topHandler: (uid) => {
      dispatch(TopEmbed(uid));
    },
  }
}

export const EmbedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbedPanel)
