#!/bin/bash

curl --location --request POST 'http://localhost:9999/api/v1/video/mp4-to-gif' \
--form 'file=@"./amazingJump.mp4"' > converted.gif