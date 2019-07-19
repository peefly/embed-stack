import { connect } from 'react-redux'
import { EmbedPanel } from 'components/EmbedPanel.js'

const mapStateToProps = (state) => {
  return {
    embedList: state.embedList
  }
}

export const EmbedContainer = connect(
  mapStateToProps
)(EmbedPanel)
