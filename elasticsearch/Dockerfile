# Use the official Elasticsearch Docker image as the base image
FROM docker.elastic.co/elasticsearch/elasticsearch:7.15.1

# Set environment variables (optional, you can still override them when running the container)
ENV discovery.type=single-node
ENV network.host=0.0.0.0
ENV http.port=9200

# Expose the ports (if needed)
EXPOSE 9200
EXPOSE 9300

# Define a volume for Elasticsearch data
VOLUME /usr/share/elasticsearch/data

# Start Elasticsearch when the container starts
CMD ["elasticsearch"]
