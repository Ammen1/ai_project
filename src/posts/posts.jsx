import React from "react";

const Posts = (props) => {
  const { posts } = props;
  // const classes = useStyles();
  if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
        <div container spacing={5} alignItems="flex-end">
          {posts.map((post) => {
            return (
              // Enterprise card is full width at sm breakpoint
              <div item key={post.id} xs={12} md={4}>
                <Card className={classes.card}>
                  <Link
                    color="textPrimary"
                    href={"post/" + post.slug}
                    className={classes.link}
                  >
                    <CardMedia
                      className={classes.cardMedia}
                      image={post.image}
                      title="Image title"
                    />
                  </Link>
                  <CardContent className={classes.cardContent}>
                    <div
                      gutterBottom
                      variant="h6"
                      component="h2"
                      className={classes.postTitle}
                    >
                      {post.title.substr(0, 50)}...
                    </div>
                    <div className={classes.postText}>
                      <div color="textSecondary">
                        {post.excerpt.substr(0, 40)}...
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </Container>
    </React.Fragment>
  );
};
export default Posts;
