uses java.awt.*
uses java.lang.*
uses javax.swing.*
uses java.awt.event.*
uses java.math.BigDecimal
uses java.net.URI

/**
 * Author : Aravind R Pillai
 * Date : 12 May 2021
 */
var rootFolder : String = ""
var stopButtonClicked = false
var mouseThread : Thread
var frame = new JFrame("Code Inspector")


//Column for Root folder path
var rootFolderInputLabel = new JLabel("Select Root Folder")
rootFolderInputLabel.setBounds(20, 10, 1000, 30)
var rootFolderInput = new JTextField()
rootFolderInput.setText(rootFolder)
rootFolderInput.setBounds(20, 40, 550, 30)
var browseRootFolderButton = new JButton("Browse")
browseRootFolderButton.setBounds(570, 40, 100, 30)
frame.add(rootFolderInputLabel)
frame.add(rootFolderInput)
frame.add(browseRootFolderButton)


//Column for Output path
var outputFolderInputLabel = new JLabel("Select Output Folder")
outputFolderInputLabel.setBounds(20, 90, 1000, 30)
var outputFolderInput = new JTextField()
outputFolderInput.setText(rootFolder)
outputFolderInput.setBounds(20, 120, 550, 30)
var browseOutputFolderButton = new JButton("Browse")
browseOutputFolderButton.setBounds(570, 120, 100, 30)
frame.add(outputFolderInputLabel)
frame.add(outputFolderInput)
frame.add(browseOutputFolderButton)


var pcf = new JRadioButton("PCF", false)
var entity = new JRadioButton("Enitity", false)
var typelist = new JRadioButton("Typelist", false)
var gosu = new JRadioButton("Gosu", false)
var rules = new JRadioButton("Rules", false)
var dispKey = new JRadioButton("DisplayKey", false)
var group = new ButtonGroup()
pcf.setBounds(20, 190, 100, 30)
entity.setBounds(120, 190, 100, 30)
typelist.setBounds(220, 190, 100, 30)
gosu.setBounds(320, 190, 100, 30)
rules.setBounds(420, 190, 100, 30)
dispKey.setBounds(520, 190, 100, 30)
group.add(pcf)
group.add(entity)
group.add(typelist)
group.add(gosu)
group.add(rules)
group.add(dispKey)
frame.add(pcf)
frame.add(entity)
frame.add(typelist)
frame.add(gosu)
frame.add(rules)
frame.add(dispKey)





var ftr = "<html>Credits: Aravind R Pillai | Visit <a href=\"\">www.aravindrpillai.com</a> for more details.</html>"
var footer = new JLabel(ftr)
footer.setCursor(new Cursor(Cursor.HAND_CURSOR))
footer.setBounds(20, 210, 1000, 30)
frame.add(new JSeparator())
frame.add(footer)


//Setting up frame
var dim = Toolkit.getDefaultToolkit().getScreenSize()
frame.setLocation(dim.width / 3 - frame.getSize().width, dim.height / 3 - frame.getSize().height)
frame.setResizable(false)
frame.setSize(750, 500)
frame.setLayout(null)
frame.setVisible(true)
frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);




/**
 * -------------ACTIONS------------------
 */


browseRootFolderButton.addActionListener(new ActionListener() {
  @Override
  public function actionPerformed(e : ActionEvent) : void {
    var path = browse(true)
    rootFolderInput.setText(path)
  }
})



browseOutputFolderButton.addActionListener(new ActionListener() {
  @Override
  public function actionPerformed(e : ActionEvent) : void {
    var path = browse(true)
    outputFolderInput.setText(path)
  }
})



frame.addWindowListener(new WindowAdapter() {
  public function windowClosing(e : WindowEvent) : void {
    if(mouseThread != null){
      mouseThread.stop()
    }
  }
})

footer.addMouseListener(new MouseAdapter() {
  public function mouseClicked(e : MouseEvent) : void {
    Desktop.getDesktop().browse(new URI("www.aravindrpillai.com"))
  }
})


function browse(isFolderAlone:boolean) : String {
    var f = new JFileChooser()
    if(isFolderAlone){
      f.FileSelectionMode = JFileChooser.DIRECTORIES_ONLY
    }else{
      f.FileSelectionMode = JFileChooser.FILES_AND_DIRECTORIES
    }
    f.showSaveDialog(null)
    return f.SelectedFile.AbsolutePath
}
