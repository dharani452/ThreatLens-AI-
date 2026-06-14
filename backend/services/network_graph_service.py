class NetworkGraphService:

    def build_graph(self, data):

        nodes = []
        edges = []

        users = set()
        resources = set()

        for _, row in data.head(20).iterrows():

            username = row["username"]
            resource = row["resource"]

            users.add(username)
            resources.add(resource)

            edges.append(
                {
                    "source": username,
                    "target": resource
                }
            )

        for user in users:

            nodes.append(
                {
                    "id": user,
                    "label": user,
                    "type": "user"
                }
            )

        for resource in resources:

            nodes.append(
                {
                    "id": resource,
                    "label": resource,
                    "type": "resource"
                }
            )

        return {
            "nodes": nodes,
            "edges": edges
        }