# Require the utils.rb file using require_relative
require_relative '../utils'

# Call the read_file function to read the contents of data.txt
file_path = 'day-01/data.txt'  # Path to the data.txt file relative to the project root
file_content = read_file(file_path)

# Output the content to the console (or do something else with it)
puts file_content