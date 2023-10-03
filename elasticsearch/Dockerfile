# Use an official Elasticsearch image as the base image
FROM docker.elastic.co/elasticsearch/elasticsearch:7.15.1

# Set environment variables for Elasticsearch configuration
ENV discovery.type single-node
ENV network.host 0.0.0.0

# Expose the default Elasticsearch port
EXPOSE 9200
