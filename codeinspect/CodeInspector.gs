package codeinspect

uses codeinspect.base.Execute
uses codeinspect.util.LoggerUtil

/**
 * author : Aravind R Pillai
 * date : 03 Oct 2022
 * Desc : Main class to start the process
 */
class CodeInspector {

  static final var _logger = LoggerUtil.getLogger(CodeInspector)

  /**
   * main function to trigger the inspection
   * @param filesXMLLocation
   */
  static function inspect(filesXMLLocation : String){
    var startTime = System.currentTimeMillis()
    _logger.info("Starting the inspection")
    var executeObj = new Execute()
    executeObj.run(filesXMLLocation)
    _logger.info("Inspection completed in "+((System.currentTimeMillis()-startTime)/1000)+" seconds")
  }
}