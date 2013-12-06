#!/bin/bash

DOCUMENT_ROOT=`pwd`
if [ "$#" != "0" ]; then
	DOCUMENT_ROOT="$1"
fi

java -jar test/jscover/JSCover-all.jar -ws --report-dir=test/jscover/report --no-instrument=test/jasmine
