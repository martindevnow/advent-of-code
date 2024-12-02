# Require the utils.rb file using require_relative
require_relative '../utils'

# Call the read_file function to read the contents of data.txt
file_path = 'day-01/data.txt'  # Path to the data.txt file relative to the project root
file_content = read_file(file_path)

lines = file_content.split("\n").map{ |l| l.split("  ") }

left_list = []
right_list = []
diff = []

# convert to two arrays
lines.each do | line |
  left_list.push(line[0].to_i)
  right_list.push(line[1].to_i)
end

# sort arrays
left_sorted = left_list.sort
right_sorted = right_list.sort


# get abs diff
left_sorted.each_with_index do | left, index | 
  diff.push((left_sorted[index] - right_sorted[index]).abs)
end

# sum diff
sum = diff.reduce(0) { |acc, curr| acc + curr }


# Output the content to the console (or do something else with it)
puts "Part 1: #{sum}"



#
# Part 2
#
similarity = []

# build hash map of occurrences in right list
right_hash = Hash.new(0)

right_sorted.each do | num |
  right_hash[num] += 1
end


# multiply left list by occurrences
left_sorted.each do | num |
  similarity.push(num * (right_hash[num] || 0))
end

# sum similarity

sum2 = similarity.reduce(0) { |acc, curr| acc + curr }

puts "Part 2: #{sum2}"

