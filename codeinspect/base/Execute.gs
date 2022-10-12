package codeinspect.base

uses codeinspect.dto.RuleDTO
uses codeinspect.util.LoggerUtil
uses codeinspect.util.FilesXMLUtil
uses codeinspect.dto.FileMetadataDTO
uses codeinspect.util.PropertyReaderUtil

/**
 * author : Aravind R Pillai
 * date : 03 Oct 2022
 * Desc : Main class to start the process
 */
class Execute {

  static final var _logger = LoggerUtil.getLogger(Execute)

  /**
   * Function to start the process
   */
  function run(filesXMLLocation : String = null){
    var fileConfigs = FilesXMLUtil.getFileDetails(filesXMLLocation)
    var pfObj = new PrepareFiles()
    var fileMetadataList = pfObj.prepare(fileConfigs)
    _logger.info("Created " + fileMetadataList.Count + " metadata files")
    foreach(fileMetaData in fileMetadataList){
      foreach(rule in fileMetaData.Rules){
        invokeFramework(fileMetaData, rule)
      }
      _logger.debug("Done validation for " + fileMetaData.FileName)
    }
    new DocumentBuilder().buildDocument(fileMetadataList)
    _logger.info("Execution completed.")
  }

  /**
   * Reflection to invoke the method from the rules
   * @param file
   * @param rule
   */
  private function invokeFramework(file : FileMetadataDTO, rule : RuleDTO){
    var rulesPackage = "codeinspect.rules."
    var functionName = "run"
    var paramValues : Object[] = {file, rule}
    var paramdataTypes : Class<Object>[] = {FileMetadataDTO, RuleDTO}
    var cls = Class.forName(rulesPackage + rule.ClassName)
    var inst = cls.newInstance()
    var func = cls.Superclass.getDeclaredMethod(functionName, paramdataTypes);
    func.invoke(inst, paramValues);
  }
}