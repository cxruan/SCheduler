const initialState = {
  courses: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'ADD_COURSE': {
      return {
        courses: [...state.courses, ...action.newCourse]
      };
    }
    case 'PENALIZE_CHANGE': {
      const newData = state.courses.map(node => {
        if (node.id === action.id) {
          return { ...node, penalize: !node.penalize };
        }
        const parentNode = state.courses.find(parent => parent.id === node.parentId);
        if (node.parentId === action.id) {
          return { ...node, penalize: !parentNode.penalize };
        }
        if (parentNode && parentNode.parentId === action.id) {
          const grandNode = state.courses.find(grand => grand.id === parentNode.parentId);
          return { ...node, penalize: !grandNode.penalize };
        }
        return node;
      });
      return {
        courses: [...newData]
      };
    }
    case 'INCLUDE_CHANGE': {
      const newData = state.courses.map(node => {
        if (node.id === action.id) {
          return { ...node, include: !node.include };
        }
        const parentNode = state.courses.find(parent => parent.id === node.parentId);
        if (node.parentId === action.id) {
          return { ...node, include: !parentNode.include };
        }
        if (parentNode && parentNode.parentId === action.id) {
          const grandNode = state.courses.find(grand => grand.id === parentNode.parentId);
          return { ...node, include: !grandNode.include };
        }
        return node;
      });
      return {
        courses: [...newData]
      };
    }
    case 'CLEAR_ALL': {
      return {
        courses: []
      };
    }
    default:
      return state;
  }
}
