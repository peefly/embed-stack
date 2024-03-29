import { connect } from 'react-redux'
import { EmbedPanel } from 'components/EmbedPanel.js'
import { RemoveEmbed, TopEmbed, SetEmbedHtml, ReplaceEmbed, SetEmbedLayout } from 'actions/app'

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
    },
    replaceHandler: (uid) => {
      dispatch(ReplaceEmbed(uid));
    },
    setLayoutHandler: (uid, layout) => {
      dispatch(SetEmbedLayout(uid, layout));
    }
  }
}

export const EmbedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbedPanel)
