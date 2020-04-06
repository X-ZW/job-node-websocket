import { connect } from 'react-redux';

let mapStateToProps = state => ({ state });
let mapDispatchToProps = dispatch => ({ dispatch });

const dealFn = connect(mapStateToProps, mapDispatchToProps);
export default dealFn