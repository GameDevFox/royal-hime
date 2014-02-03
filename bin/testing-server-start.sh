#!/bin/bash

java -jar test/jscover/JSCover-all.jar -ws --report-dir=test/jscover/report \
	--no-instrument=app/scripts/lib \
	--no-instrument=test/jasmine \
	--no-instrument=test/unit
