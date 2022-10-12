package codeinspect.util

uses java.io.FileReader
uses codeinspect.util.LoggerUtil
uses gw.util.concurrent.LockingLazyVar

/**
 * author : Aravind R Pillai
 * date : 03 Oct 2022
 * Utility class to handle the property file
 */
class PropertyReaderUtil {

  private static var _propertyFileLocation = "/codeinspect/constants/codeinspection.properties"
  private static var _properties = LockingLazyVar.make(\-> PropertyReaderUtil.loadProperties())
  static final var _logger = LoggerUtil.getLogger(PropertyReaderUtil)

  /**
   * Function to load properties
   * @param propName
   */
  public static function getProperty(propertyName : String) : String {
    return _properties.get().getProperty(propertyName)?.trim()
  }

  /**
   * Function to load the properties
   * @return
   */
  private static function loadProperties() : Properties{
    _logger.info("Starting to load properties")

    try{
      var fileReader = new FileReader(FileUtil.AppFolder+_propertyFileLocation)
      var prop = new Properties()
      prop.load(fileReader)
      _logger.debug("Found " + prop.Count + " properties")
      fileReader.close()
      _logger.info("Properties loaded successfully ")
      return prop
    }catch(e:Exception){
      _logger.error(e.StackTraceAsString)
      throw e
    }
  }

}