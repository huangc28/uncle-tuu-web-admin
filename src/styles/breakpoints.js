import facepaint from 'facepaint'

// Viewport break points are aligned with bootstrap breakpoint.
// Break point scale is referred to bootstrap: https://react-bootstrap.github.io/layout/grid/#grid-props
export const XXLarge = 1400 
export const XLarge = 1200
export const Large = 992
export const Medium = 768  
export const Small = 576 

export const mediaQuery = facepaint(
  [Small, Medium, Large].map(bp => `@media screen and (min-width: ${bp}px)`)
)
