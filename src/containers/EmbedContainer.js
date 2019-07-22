import { connect } from 'react-redux'
import { EmbedPanel } from 'components/EmbedPanel.js'
import { RemoveEmbed, TopEmbed, SetEmbedHtml } from 'actions/app'

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
    setHtmlHandler: (uid, embedHtml) => {
      dispatch(SetEmbedHtml(uid, embedHtml));
    }
  }
}

export const EmbedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbedPanel)
