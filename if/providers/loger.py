import sys
import logging
from loguru import logger
from configs.log import log_conf


class InterceptHandler(logging.Handler):
    def emit(self, record):

        try:
            level = logger.level(record.levelname).name
        except ValueError:
            level = record.levelno


        frame, depth = logging.currentframe(), 2
        while frame.f_code.co_filename == logging.__file__:
            frame = frame.f_back
            depth += 1

        logger.opt(depth=depth, exception=record.exc_info).log(
            level, record.getMessage()
        )


async def register():
    logging.root.handlers = [InterceptHandler()]
    logging.root.setLevel(log_conf.LEVEL)


    for name in logging.root.manager.loggerDict.keys():
        logging.getLogger(name).handlers = []
        logging.getLogger(name).propagate = True


    logger.configure(
        handlers=[
            {"sink": sys.stdout},
            {
                "sink": log_conf.PATH,
                "rotation": "00:00",
                "retention": log_conf.RETENTION,
            },
        ]
    )