import React from 'react';
import Helmet from 'react-helmet';
import styled from 'react-emotion';
import Typography from 'rmwc/Typography';
import Img from 'gatsby-image';
import UserInfo from '../components/UserInfo/UserInfo';
import PostTags from '../components/PostTags/PostTags';
import SocialLinks from '../components/SocialLinks/SocialLinks';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12.5%;
`;

export const OutsetColumn = styled.div`
  max-width: 1000px;
  width: 100%;
  /* height: ; */
  margin: 0 auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-top: 52px;
`;

export const InsetColumn = styled.div`
  max-width: 740px;
  width: 100%;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 52px;
`;

export const PostInner = styled.div`
  max-width: 740px;
  margin: 0 auto;
`;

export const TagsList = styled.li`
  display: inline-block;
  margin: 10px 5px;
`;

export const CenteredTypography = styled(Typography)`
  margin-left: auto;
  margin-right: auto;
  font-weight: 600;
  text-align: center;
`;

export const StyledArticle = styled.article`
  /* font-size: 1.125rem;
  line-height: 1.82813rem;
  margin-bottom: 1.82813rem; */
`;

export const AspectRatioPlaceholder = styled.div`
  max-width: 1000px;
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: block;
`;
export const StyledFigure = styled.figure`
  margin: 0;
`;

export default function PostTemplate(props) {
  const { slug } = props.pathContext;
  const postNode = props.data.markdownRemark;
  const post = postNode.frontmatter;
  const plaatje = postNode.frontmatter.cover.childImageSharp.sizes;
  if (!post.id) {
    post.id = slug;
  }
  if (!post.category_id) {
    post.category_id = config.postDefaultCategoryID;
  }
  return (
    <div>
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <StyledArticle>
        <InsetColumn>
          <CenteredTypography tag="h1" use="display1">
            {post.title}
          </CenteredTypography>
        </InsetColumn>
        <OutsetColumn>
          <AspectRatioPlaceholder>
            <StyledFigure>
              <Img sizes={plaatje} />

              {/* <ProgressiveImage
                src={`${post.cover}`}
                placeholder="data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAABQBQCdASoqABwAP/3+/3+/urWyMBVYA/A/iWIAAR7p/Y3etgh4KD8QqXEZj6waibITSIAA/cndnUz4/z4LEgByYUql75Cq/12W33KFIKQpc8L0Dt19C7NFXin0tKlxd70dzSF978msbuqLjDgAAA=="
              >
                {src => (
                  <img
                    alt={post.title}
                    src={src}
                    style={{
                      maxWidth: "100%"
                      // backgroundImage: `url(${src})`,
                      // backgroundSize: 'cover',
                      // height: '1186px',
                      // height: '36rem', // so far it looks the placeholder needs height to load properly sized
                      // height: '24.626rem',
                    }}
                  />
                )}
              </ProgressiveImage> */}
              <Typography use="caption">{post.caption}</Typography>
            </StyledFigure>
          </AspectRatioPlaceholder>
        </OutsetColumn>
        <InsetColumn>
          <PostInner>
            <Typography use="subheading1" tag="h5">
              Written by {post.author.id}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          </PostInner>
        </InsetColumn>
        <InsetColumn>
          <Meta>
            <PostTags tags={post.tags} />
            <SocialLinks postPath={slug} postNode={postNode} />
          </Meta>
          <UserInfo config={config} />
        </InsetColumn>
      </StyledArticle>
    </div>
  );
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover {
          childImageSharp {
            sizes(maxWidth: 1000) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
        caption
        date
        category
        tags
        author {
          id
        }
      }
      fields {
        slug
      }
    }
  }
`;
