import winston, { format } from "winston";

const logFormat = format.printf((info) => {
  const formattedNamespace = info.metadata.namespace || "";

  return `${info.metadata.timestamp} [${info.level}] [${formattedNamespace}]: ${info.message}`;
});

const logger = winston.createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.metadata(),
    logFormat
  ),
  transports: [new winston.transports.Console()],
});

const loggerWithNameSpace = function (namespace: string) {
  return logger.child({ namespace });
};

export default loggerWithNameSpace;
