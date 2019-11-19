import { FETCH_INSPECTIONS, SET_DEFAULT_INSPECTIONS } from '../actions'

const inspections = (state = [], action) => {
  switch (action.type) {
    case FETCH_INSPECTIONS:
      return action.payload
    case SET_DEFAULT_INSPECTIONS:
      return []
    default:
      return state
  }
}

export default inspections