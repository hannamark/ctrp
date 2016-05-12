
class CreateTrialSummaryReportService

  def initialize(params)
    @trial_id = params[:trial_id]
    @trial = Trial.find_by_id(@trial_id)

  end


  def generate_tsr_in_rtf
p "hello 111"
    #Fonts
    fonts = [RTF::Font.new(RTF::Font::ROMAN, 'Times New Roman'),
             RTF::Font.new(RTF::Font::MODERN, 'Courier')]
p "hello 222"

    #Styles
    styles = {}
    styles['PS_HEADING']              = RTF::ParagraphStyle.new
    styles['PS_NORMAL']               = RTF::ParagraphStyle.new
    styles['PS_NORMAL'].justification = RTF::ParagraphStyle::FULL_JUSTIFY
    styles['PS_INDENTED']             = RTF::ParagraphStyle.new
    styles['PS_INDENTED'].left_indent = 300
    styles['PS_TITLE']                = RTF::ParagraphStyle.new
    styles['PS_TITLE'].space_before   = 100
    styles['PS_TITLE'].space_after    = 200
    styles['CS_HEADING']              = RTF::CharacterStyle.new
    styles['CS_HEADING'].bold         = true
    styles['CS_HEADING'].font_size    = 36
    styles['CS_CODE']                 = RTF::CharacterStyle.new
    styles['CS_CODE'].font            = fonts[1]
    styles['CS_CODE'].font_size       = 16

    #Colours
    red = RTF::Colour.new(255,0,0)
    green = RTF::Colour.new(0,255,0)
    grey  = RTF::Colour.new(0,255,255)

   # document = RTF::Document.new(RTF::Font.new(RTF::Font::ROMAN, 'Times New Roman'))

p "hello @@@@"

    document = RTF::Document.new(fonts[0])
p "hello 0000"

    tab = RTF::TableNode.new(1,5,8,4)

    row1 = RTF::TableRowNode.new(tab,1,300)

    document << row1.to_rtf
    document << tab.to_rtf


p "hello 333"



    #document.parent = colour_tab


    document.paragraph(styles['PS_HEADING']) do |p1|
      p1.apply(styles['CS_HEADING']) << 'Trial Summary Report'
    end
p "hello 444"

    document.paragraph(styles['PS_NORMAL']) do |p1|
      p1 << 'This document is automatically generated using the RTF Ruby '
      p1 << 'library. This serves as an example of what can be achieved '
      p1 << 'in document creation via the library. The source code that '
      p1 << 'was used to generate it is listed below...'
    end

    sample_table = RTF::TableNode.new(document,2,2,5)

    sample_table[0][0] << 'Sample@@@@@'
    sample_table[0][1]  << 'sample'

#        @cells << RubyRTF::Table::Row::Cell.new(self, @cells.length)



    document.page_break


    #row RTF::TableRowNode()
    array = document.table(4, 1)
    array.border_width =30
    array[0].shading_colour = green
    array[0][0].background(red) << "Official Title"
    array[1][0] << @trial.official_title

    array[2][0] << "Acronym"

    array[3][0] << "text"


    document.page_break

    array = document.table(2, 2)
    array.border_width =30
    array[0].shading_colour = green

    array1 = document.table(1,1)
    array1[0][0].background(grey) << "Hellow1111"



    document.paragraph(styles['PS_NORMAL']) do |p2|
      p2 << 'This document is automatically generated using the RTF Ruby '
      p2 << 'library. This serves as an example of what can be achieved '
      p2 << 'in document creation via the library. The source code that '
      p2 << 'was used to generate it is listed below...'
    end


    array1 = document.table(2,2,2000,4000,2000)
    array1[0][0].background(grey) << "Hellow1111"

    #array1.add_row();

    table    = document.table(3, 3, 2000, 4000, 2000)
    table.border_width = 5
    table[0][0] << 'Cell 0,0'
    table[0][1].top_border_width = 10
    table[0][1] << 'This is a little preamble text for '
    table[0][1].apply(styles['CS_HEADING']) << 'Cell 0,1'
    table[0][1].line_break
    table[0][1] << ' to help in examining how formatting is working.'
    table[0][2] << 'Cell 0,2'
    table[1][0] << 'Cell 1,0'
    table[1][1] << 'Cell 1,1'
    table[1][2] << 'Cell 1,2'
    table[2][0] << 'Cell 2,0'
    table[2][1] << 'Cell 2,1'
    table[2][2] << 'Cell 2,2'



    document.paragraph(styles['PS_TITLE']) do |p1|
      p1.italic do |p2|
        p2.bold << 'Listing 1:'
        p2 << ' Generator program code listing.'
      end
    end

    document.paragraph(styles['PS_NORMAL']) do |p1|
      p1 << "This example shows the creation of a new document and the "
      p1 << "of textual content to it. The example also provides examples "
      p1 << "of using block scope to delimit style scope (lines 40-51)."
    end


    document.page_break


    array1 = document.table(1,1,2000,4000,2000)
    array1[0][0].background(grey) << "Trial Identification"



    trial_identification_table    = document.table(3, 3, 2000, 4000, 2000)
    #trial_identification_table.add()

    table.border_width = 5
    table[0][0] << 'Cell 0,0'
    table[0][1].top_border_width = 10
    table[0][1] << 'This is a little preamble text for '
    table[0][1].apply(styles['CS_HEADING']) << 'Cell 0,1'
    table[0][1].line_break
    table[0][1] << ' to help in examining how formatting is working.'
    table[0][2] << 'Cell 0,2'
    table[1][0] << 'Cell 1,0'
    table[1][1] << 'Cell 1,1'
    table[1][2] << 'Cell 1,2'
    table[2][0] << 'Cell 2,0'
    table[2][1] << 'Cell 2,1'
    table[2][2] << 'Cell 2,2'


    ###### TSR Report start




    #And the file name will be "TSR_""CTRP Trial ID""_""Current Date YYYY-MM-DD""-
    # "Current Time HHMM(24hr)""_""Current Submission Type (O for original and A for amendment""_""Amendment Number (for amendments)"<examples>

    temp_file = Tempfile.new(['Sample2',".rtf"])
    temp_file <<  document.to_rtf

    today_date = Date.today()
    file_name = "TSR_" + @trial.nci_id + "_" + today_date.strftime("%d-%h-%Y").to_s+".rtf"

    trial_document_params = {:file => temp_file, :document_type =>"Trial Summary Report", :file_name => file_name,:trial_id => @trial_id}
    td = TrialDocument.new(trial_document_params)
    td.save!
hello "888"

   return td.id

  end




end
