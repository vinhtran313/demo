yarn build-stg
aws --profile infodeliver-test s3 cp dist s3://hoko-healthdc-stg --recursive
aws --profile infodeliver-test cloudfront create-invalidation --distribution-id EKLFODL350L1J --path "/*"
