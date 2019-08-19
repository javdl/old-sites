// import React from 'react'
// import slugify from 'slugify'

// const Tags = props => {
//   const { post, ...rest } = props
//   return (
//     <div className="Tags" {...rest}>
//       {(props.post.tags || []).map((tag, i) => {
//          return [i !== 0 ? ' | ' : null,
//           <a key={i} className="tag" href={`/tags/${slugify(tag.toLowerCase())}`}>
//              {tag}
//           </a>]
//       })}
//     </div>
//   )
// }

// export default Tags

import React from 'react'
import {Link} from 'react-router'
import {tagMap} from 'utils'
import { prefixLink } from 'gatsby-helpers'

const Tags = props => {
  const { post, ...rest } = props
  return (
    <div className="Tags" {...rest}>
      {(props.post.tags || []).map((tag, i) => {
         return [i !== 0 ? ' | ' : null,
           <Link key={i} to={{pathname:prefixLink('/tags/'), hash: '#'+tagMap(tag)}}>
             {tag}
           </Link>]
       })}
    </div>
  )
}

export default Tags