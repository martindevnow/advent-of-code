# Get the command line argument for the day (ARGV[0] corresponds to the first argument)
day = ARGV[0]

# Construct the file path (assuming files are structured similarly to the JS version)
file_path = File.join(__dir__, "day-#{day}", 'index.rb')  # Assuming Ruby files, change to .ts if necessary

# Load the file dynamically
require file_path