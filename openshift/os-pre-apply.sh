#!/bin/bash
set -e

printInfo() {
  echo -e "\033[32m[INFO]: ${1}\033[0m"
}

create_credentials_integration () {
    printInfo "Create App Secrets: "
    if ! oc get secrets/${OS_BASE_APP_NAME}-${stage} > /dev/null 2>&1 ; then
        printInfo "secrets : ${OS_BASE_APP_NAME}-${stage} don't exist > will create it"
    else
        printInfo "secrets : ${OS_BASE_APP_NAME}-${stage} already exist > delete it and recreate it"
        oc delete secrets ${OS_BASE_APP_NAME}-${stage}
        printInfo "secrets : ${OS_BASE_APP_NAME}-${stage} deleted"
    fi
    oc process \
-p APP_NAME=${OS_BASE_APP_NAME}-${stage} \
-p APP_TITLE=${INTEGRATION_APP_TITLE} \
-p BASE_API_URL=${INTEGRATION_BASE_API_URL} \
-p BASE_WEBAPP_URL=${INTEGRATION_BASE_WEBAPP_URL} \
-f openshift/app-credentials.yml | oc apply -f -
    printInfo "Secret app successfully deployed"
}

create_credentials_staging () {
    printInfo "Create App Secrets: "
    if ! oc get secrets/${OS_BASE_APP_NAME}-${stage} > /dev/null 2>&1 ; then
        printInfo "secrets : ${OS_BASE_APP_NAME}-${stage} don't exist > will create it"
    else
        printInfo "secrets : ${OS_BASE_APP_NAME}-${stage} already exist > delete it and recreate it"
        oc delete secrets ${OS_BASE_APP_NAME}-${stage}
        printInfo "secrets : ${OS_BASE_APP_NAME}-${stage} deleted"
    fi
    oc process \
-p APP_NAME=${OS_BASE_APP_NAME}-${stage} \
-p APP_TITLE=${STAGING_APP_TITLE} \
-p BASE_API_URL=${STAGING_BASE_API_URL} \
-p BASE_WEBAPP_URL=${STAGING_BASE_WEBAPP_URL} \
-f openshift/app-credentials.yml | oc apply -f -
    printInfo "Secret app successfully deployed"
}

create_credentials_production () {
    printInfo "Create App Secrets: "
    if ! oc get secrets/${OS_BASE_APP_NAME} > /dev/null 2>&1 ; then
        printInfo "secrets : ${OS_BASE_APP_NAME} don't exist > will create it"
    else
        printInfo "secrets : ${OS_BASE_APP_NAME} already exist > delete it and recreate it"
        oc delete secrets ${OS_BASE_APP_NAME}
        printInfo "secrets : ${OS_BASE_APP_NAME} deleted"
    fi
    oc process \
-p APP_NAME=${OS_BASE_APP_NAME} \
-p APP_TITLE=${PROD_APP_TITLE} \
-p BASE_API_URL=${PROD_BASE_API_URL} \
-p BASE_WEBAPP_URL=${PROD_BASE_WEBAPP_URL} \
-f openshift/app-credentials.yml | oc apply -f -
    printInfo "Secret app successfully deployed"
}

printInfo "Start services deployment"
if [ "$stage" == "integration" ]; then
    printInfo "Stage: INTEGRATION"
    create_credentials_integration
fi
if [ "$stage" == "staging" ]; then
    printInfo "Stage: STAGING"  
    create_credentials_staging
fi
if [ "$stage" == "production" ]; then
    printInfo "Stage: PRODUCTION"
    create_credentials_production
fi

printInfo "Services deployment ended"