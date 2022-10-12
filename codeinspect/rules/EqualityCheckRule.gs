package codeinspect.rules

uses codeinspect.util.LoggerUtil
uses codeinspect.base.CodeInspectBase
uses codeinspect.dto.FileMetadataDTO
uses java.util.logging.Level

/**
 * author : Krishna Kumar B
 * date : 11 Oct 2022
 * desc : Rule To check .equals function and throws a violation on .equals function.
 * == must be used instead of .equals()
 */
class EqualityCheckRule extends CodeInspectBase {

  private var _logger = LoggerUtil.getLogger(EqualityCheckRule)

  override function shouldExecute(fileMetaData : FileMetadataDTO) : boolean {
    return true
  }

  override function rule(fileMetaData : FileMetadataDTO, lines : List<String>) {
    _logger.info("Starting rule ${RuleName} for file : ${FileName}")
    try {
      foreach (line in lines index lineNumber) {
        line = trackAndFormatLine(lineNumber, line)
        if (!IsThisLineEmpty and !IsThisLineCommented and line.contains(".equals")) {
          reportViolation(lineNumber + 1, line)
        }
      }
    } catch (e : Exception) {
      _logger.info(e.StackTraceAsString)
      reportInspectionFailure(e)
    }
    _logger.debug("Finished evaluating rule ${RuleName} for file : ${FileName}")
  }

}