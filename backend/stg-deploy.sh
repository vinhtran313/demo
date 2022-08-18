sam build --template-file lambda_configs/stg.template.yaml
sam deploy --profile infodeliver-test --config-file lambda_configs/stg.samconfig.toml
